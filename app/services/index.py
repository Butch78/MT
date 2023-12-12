from typing import Sequence
import qdrant_client
import asyncio
import aiofiles
from fastapi import File, UploadFile
from functools import partial
import os
from app.schema.card import Card

from app.utils.config import settings

#  region:    --- LlamaIndex Modules

from llama_index import Document, SimpleDirectoryReader
from llama_index.embeddings import OpenAIEmbedding
from llama_index.text_splitter import SentenceSplitter
from llama_index.extractors import TitleExtractor
from llama_index.ingestion import IngestionPipeline
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index import VectorStoreIndex
from llama_index.schema import BaseNode
from llama_index.llms import OpenAI
from llama_index.prompts import (
    ChatMessage,
    ChatPromptTemplate,
    MessageRole,
)
from llama_index.program import OpenAIPydanticProgram

#  endregion: --- LlamaIndex Modules


class LlamaIndex:
    def __init__(self, user_id: str, file_name: str):
        self.user_id = user_id
        self.loop = asyncio.get_event_loop()

    async def upload_file(self, file: UploadFile = File(...)):
        """Handle a file upload, the file should have the user's ID in the filename."""

        # Create Temporary Directory and File to store the file

        #  check if temp exists
        if os.path.exists("/tmp"):
            print("Temp Exists!")

        async with aiofiles.tempfile.TemporaryDirectory() as temp_path:
            async with aiofiles.tempfile.NamedTemporaryFile(
                suffix=".pdf", dir=temp_path, delete=False
            ) as temp_file:
                print("writing file to", temp_path)
                await temp_file.write(await file.read())
                index = await self.loop.run_in_executor(
                    None,
                    partial(
                        self.ingest_documents,
                        temp_path,
                    ),
                )

    def get_ingestion_pipeline(self, vector_store: QdrantVectorStore):
        print("Creating ingestion pipeline")

        return IngestionPipeline(
            transformations=[
                SentenceSplitter(chunk_size=8000, chunk_overlap=20),
                TitleExtractor(),
                OpenAIEmbedding(),
            ],
            vector_store=vector_store,
        )

    def run_pipeline(self, pipeline: IngestionPipeline, documents: list[Document]):
        print("Running ingestion pipeline")
        nodes = pipeline.run(documents=documents)
        self.query_document(nodes=nodes)

    def ingest_documents(self, file_path: str):
        reader = SimpleDirectoryReader(file_path)
        documents = reader.load_data()

        client = qdrant_client.QdrantClient(url=settings.QDRANT_URL)
        vector_store = QdrantVectorStore(client=client, collection_name=self.user_id)

        ingestion_pipeline = self.get_ingestion_pipeline(vector_store=vector_store)
        self.run_pipeline(pipeline=ingestion_pipeline, documents=documents)
        print("Ingestion complete")
        return VectorStoreIndex.from_vector_store(vector_store)

    def query_document(self, nodes: Sequence[BaseNode]):
        print("Querying document")
        # Go through each node and get the content to pass to the LLM..

        # TODO: User Service context with the Document as the context to create parrallel requests to OpenAI

        cards = []

        for node in nodes:
            node_content = node.get_content()
            prompt = ChatPromptTemplate(
                message_templates=[
                    ChatMessage(
                        role=MessageRole.SYSTEM,  # type: ignore
                        content=(
                            "You are an Expert ANKI Card Maker. You are able to make great content for your users and any text, It is only relevant to the topic at hand. \n"
                        ),
                    ),
                    ChatMessage(
                        role=MessageRole.USER,  # type: ignore
                        content=(
                            "Here is the relevant content that you will use to create the FlashCards, please only use this content to create the cards: \n"
                            "------\n"
                            "{node_content}\n"
                            "------"
                            "Please output it in the correct JSON format of \n"
                            "------\n"
                        ),
                    ),
                ],
            )
            program = OpenAIPydanticProgram.from_defaults(
                output_cls=Card,
                llm=OpenAI(model="gpt-3.5-turbo-1106"),
                prompt=prompt,
                # allow_multiple=True,
            )

            try:
                # try to pass the output to the Deck Pydantic Model
                output = program(node_content=node_content)
                try:
                    cards.append(Card(**output.dict()))
                except Exception as e:
                    print("Error: ", e)
            except Exception as e:
                print("Error: ", e)

        print("Cards: ", cards)

    async def query_vector_index(self, user_id: str):
        client = qdrant_client.QdrantClient(url=settings.QDRANT_URL)

        index = VectorStoreIndex.from_vector_store(
            QdrantVectorStore(client=client, collection_name=self.user_id)
        )
        print("Vector Store Index Created")

        prompt_template_str = """\
        
        """

        query_engine = index.as_query_engine(use_async=True)

        response = await query_engine.aquery(prompt_template_str)
