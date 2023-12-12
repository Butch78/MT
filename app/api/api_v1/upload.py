from fastapi import APIRouter, File, UploadFile, BackgroundTasks


from app.services.index import LlamaIndex

router = APIRouter()


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
        # TODO move this to ARQ worker
        llama_index = LlamaIndex(user_id=user_id, file_name=file.filename)
        background_tasks.add_task(llama_index.upload_file, file)

    return {"message": "File uploaded successfully"}
