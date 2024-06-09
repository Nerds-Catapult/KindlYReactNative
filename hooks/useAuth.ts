import { useState, useEffect } from "react";
import axios from "axios";
import Asyncstorage from "../logic/asyncstorage";
import { signinRequest, signinResponse, signupRequest, signupResponse } from "../interfaces/Auth";




const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await Asyncstorage.readAuthToken("token");
            if(token){
                setToken(token);
            }
        };
        fetchToken().then(r => r);
    }, []);

    const signIn = async (data: signinRequest) => {
      try {
        const response = await axios.post<signinResponse>(
          "https://sasha-ys6k.onrender.com/api/login",
          data
        );
        setToken(response.data.token);
        await Asyncstorage.writeAuthToken("token", response.data.token);
      } catch (error) {
        console.log(error);
      }
    };

    const signUp = async (data: signupRequest) => {
      try {
        const response = await axios.post<signupResponse>(
          "https://sasha-ys6k.onrender.com/api/register",
          data
        );
        setToken(response.data.token);
        await Asyncstorage.writeAuthToken("token", response.data.token);
      } catch (error) {
        console.log(error);
      }
    };

    const signOut = async () => {
        setToken(null);
        await Asyncstorage.removeAuthToken("token");
    };


    return { token,signIn, signUp, signOut  };
};

export default useAuth;