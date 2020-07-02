import { CreatedUserDTO } from '../dto/createdUser.dto';
import { LoggedUserDTO } from '../dto/loggedUser.dto';

// User to UserDTO
export const toUserDTO = (userData) : CreatedUserDTO => {
    const { id, username, email } = userData;

    const userDTO = { id, username, email };

    return userDTO;
}

// User to UserDTO
export const toLoggedUserDTO = (userData, token): LoggedUserDTO => {
    const { id, username, email } = userData;

    const userDTO = { id, username, email, token };

    return userDTO;
}