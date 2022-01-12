import Extensions from "@/api/Error/Extensions";

export default interface ApiError {
    extensions: Extensions
    message: string
}
