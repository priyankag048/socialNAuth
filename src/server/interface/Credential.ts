export default interface Credential {
    grant_type: string;
    client_id: string;
    client_secret: string;
    redirect_url: string;
    code: string;
}