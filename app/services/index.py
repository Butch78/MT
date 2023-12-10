from llama_index import Document, SimpleDirectoryReader
from llama_index.embeddings import OpenAIEmbedding
from llama_index.text_splitter import SentenceSplitter
from llama_index.extractors import TitleExtractor
from llama_index.ingestion import IngestionPipeline
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index import VectorStoreIndex
import qdrant_client
import asyncio
import aiofiles
from pathlib import Path
from fastapi import File, UploadFile
from functools import partial
import os

from app.utils.config import settings


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
                    )
                )


    def get_ingestion_pipeline(self, vector_store: QdrantVectorStore):

        print("Creating ingestion pipeline")
        return IngestionPipeline(
            transformations=[
                SentenceSplitter(chunk_size=250, chunk_overlap=0),
                TitleExtractor(),
                OpenAIEmbedding(),
            ],
            vector_store=vector_store,
        )


    def run_pipeline(self, pipeline: IngestionPipeline, documents: list[Document]):
        print("Running ingestion pipeline")
        pipeline.run(documents=documents)


    def ingest_documents(self, file_path: str):

        reader = SimpleDirectoryReader(file_path)
        documents = reader.load_data()

        client = qdrant_client.QdrantClient(url=settings.QDRANT_URL)
        vector_store = QdrantVectorStore(client=client, collection_name=self.user_id)


        ingestion_pipeline =  self.get_ingestion_pipeline(vector_store=vector_store)
        self.run_pipeline(pipeline=ingestion_pipeline, documents=documents)
        print("Ingestion complete")
        return  VectorStoreIndex.from_vector_store(vector_store)
