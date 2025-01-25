export interface UserData {
    email : string;
    password : string;
    expectedResult : 'success' | 'failure';
    errorMessage? : string;  
    type? : string;  
}