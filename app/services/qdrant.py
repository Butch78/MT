from llama_index.vector_stores.qdrant import QdrantVectorStore

import qdrant_client

from app.utils.config import settings

client = qdrant_client.QdrantClient(
    settings.QDRANT_URL, # For Qdrant Cloud, None for local instance
)

index = QdrantVectorStore(client=client, collection_name="documents")