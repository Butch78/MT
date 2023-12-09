import time
import asyncio
from reduct import Client, Bucket
from app.utils.config import settings

async def main():
    # Create a client for interacting with a ReductStore service
    async with Client(settings.REDUCT_URL) as client:
        # Create a bucket and store a reference to it in the `bucket` variable
        bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

        # Write data to the bucket
        ts = time.time_ns() / 1000
        await bucket.write("entry-1", b"Hey!!", ts)

        # Read data from the bucket
        async with bucket.read("entry-1", ts) as record:
            data = await record.read_all()
            print(data)

# Run the main function
loop = asyncio.get_event_loop()
loop.run_until_complete(main())