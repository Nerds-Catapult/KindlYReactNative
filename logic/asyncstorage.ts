import AsyncStorage from "@react-native-async-storage/async-storage";


class AsyncStorageService{
    private static instance: AsyncStorageService;

    private constructor(){}

    public static  getInstance(): AsyncStorageService{
        if(!AsyncStorageService.instance){
            AsyncStorageService.instance = new AsyncStorageService();
        }
        return AsyncStorageService.instance;
    }
    public writeAuthToken = async (token: string, tokenValue: string)=> {
        try {
            await AsyncStorage.setItem(token, tokenValue);
        } catch (error) {
            console.log(error);
        }
    }
    public readAuthToken = async (token: string) => {
        try {
            return await AsyncStorage.getItem(token);
        } catch (error) {
            console.log(error);
        }
    }
    public removeAuthToken = async (token: string) => {
        try {
            await AsyncStorage.removeItem(token);
        } catch (error) {
            console.log(error);
        }
    }
}

export default AsyncStorageService.getInstance();