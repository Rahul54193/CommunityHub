import * as Keychain from 'react-native-keychain';

const SERVICE_ID = 'CommunityHubApp';
const USERNAME = 'user_token';

class TokenService {
  async saveUserDetails(user:any): Promise<void> {
    try {
    let savedUser =  await Keychain.setGenericPassword(USERNAME, JSON.stringify(user), {
        service: SERVICE_ID,
      });
    } catch (error) {
      throw new Error('Failed to save user details');
    }
  }

  async getUserDetails(): Promise<any | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: SERVICE_ID,
      });
      return credentials ? credentials.password : null;
    } catch (error) {
      throw new Error('Failed to retrieve token');
    }
  }

  async clearToken(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({
        service: SERVICE_ID,
      });
    } catch (error) {
      throw new Error('Failed to clear token');
    }
  }

  async hasUserDetails(): Promise<boolean> {
    try {
      const userDetails = await this.getUserDetails();
      return !!userDetails;
    } catch (error) {
      return false;
    }
  }
}

export default new TokenService();
