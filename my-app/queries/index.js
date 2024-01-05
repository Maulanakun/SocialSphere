import { gql } from "@apollo/client";

export const UserLogin = gql`
  query UserLogin($username: String, $password: String) {
    userLogin(username: $username, password: $password) {
      statusCode
      message
      error
      token
    }
  }
`;

export const UserRegist = gql`
  mutation UserRegist($input: UserCreateInput) {
    userRegist(input: $input) {
      data {
        _id
        email
        name
        password
        username
      }
      error
      message
      statusCode
    }
  }
`;
