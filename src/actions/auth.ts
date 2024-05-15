import { ProfileType } from '../types';
import { CreateUser, LoginUser } from './dto/user';
import axios from 'axios';

export const registerUser = async (
  userDto: CreateUser,
  profileType: ProfileType
) => {
  const REGISTER_URL =
    profileType === ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors`;
  try {
    await axios.post(REGISTER_URL, userDto, { withCredentials: true });
    await loginUser({ login: userDto.email, password: userDto.password });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (loginDto: LoginUser) => {
  const userCredintals = `username=${loginDto.login}&password=${loginDto.password}`;
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      userCredintals,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  await axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`);
};
