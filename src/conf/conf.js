const conf = {
    aapwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    aapwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    aapwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    aapwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    aapwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
}

export default conf;