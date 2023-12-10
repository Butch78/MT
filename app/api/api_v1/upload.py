from fastapi import APIRouter, File, UploadFile, Depends, BackgroundTasks
from qdrant_client import QdrantClient
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index import SimpleDirectoryReader
import aiofiles

from app.services.index import LlamaIndex
from app.utils.config import settings
import os

router = APIRouter()

index_name = "./index.json"
documents_folder = "./documents"


@router.post(
    "/{user_id}",
    response_description="Upload a file",
    tags=["upload"],
)
async def file_upload(
    user_id: str,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
):
    if file.filename:
        llama_index = LlamaIndex(user_id=user_id, file_name=file.filename)

        background_tasks.add_task(llama_index.upload_file, file)


    return {"message": "File uploaded successfully"}