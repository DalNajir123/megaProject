import conf from '../conf/conf.js';
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.aapwriteUrl)
            .setProject(conf.aapwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.aapwriteDatabaseId,
                conf.aapwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.aapwriteDatabaseId,
                conf.aapwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);  
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.aapwriteDatabaseId,
                conf.aapwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);  
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.aapwriteDatabaseId,
                conf.aapwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);  
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.aapwriteDatabaseId,
                conf.aapwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);  
            return false
        }
    }

    // file upload method

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.aapwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);  
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.aapwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);  
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.aapwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;