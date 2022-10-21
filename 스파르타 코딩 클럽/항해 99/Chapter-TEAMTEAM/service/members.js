const MembersRepository = require("../repository/members");

const crypto = require("crypto");
const key = "나는 시크릿키다";
function pbkdf2(password, salt, iterations, len, hashType) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, len, hashType, (err, key) => {
      err ? reject(err) : resolve(key.toString("base64"));
    });
  });
}

class MembersService {
  membersRepository = new MembersRepository();
  createMember = async (userId, nickname, password) => {
    try {
      const existsUsers = await this.membersRepository.findAllMembers(nickname);
      if (existsUsers.length !== 0) {
        throw new Error("닉네임이 이미 존재합니다.");
        return;
      }

      const existsUserId = await this.membersRepository.findAllMembers(userId);
      if (existsUserId.length !== 0) {
        throw new Error("아이디가 이미 존재합니다.");
        return;
      }

      // key값?
      const hashPassword = await pbkdf2(password, key, 121381, 121, "sha512");
      password = hashPassword;
      const createUserData = await this.membersRepository.createMember(
        userId,
        nickname,
        password
      );
      return createUserData;
    } catch (e) {
      return;
    }
  };

  findByMember = async (userId, password) => {
    const hashPassword = await pbkdf2(password, key, 121381, 121, "sha512");
    const user = await this.membersRepository.findByMember(
      userId,
      hashPassword
    );
    if (!user || hashPassword !== user.password) {
      throw new Error("닉네임 또는 비밀번호가 일치하지 않습니다.");
    }
    return {
      token: jwt.sign({ id: user.id }, "seosoohyung-secret-key"),
    };
  };

  updateMember = async (userId, password) => {
    const hashPassword = await pbkdf2(password, key, 121381, 121, "sha512");
    const updateMember = await this.membersRepository.updateMember(
      userId,
      hashPassword
    );
    return updateMember;
  };

  deleteMember = async (userId, password) => {
    const hashPassword = await pbkdf2(password, key, 121381, 121, "sha512");
    await this.membersRepository.deleteMember(userId, hashPassword);
    return;
  };
}

module.exports = MembersService;
