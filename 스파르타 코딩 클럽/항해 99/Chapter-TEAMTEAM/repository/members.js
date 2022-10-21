const { Members } = require("../models");

class MembersRepository {
  createMember = async (userId, nickname, password) => {
    const createUserData = await this.Members.create({
      userId,
      nickname,
      password,
    });

    return createUserData;
  };

  findByMember = async (userId,hashPassword) => {
    const users = await Members.findOne({ where: { userId, password : hashPassword } });

    return users;
  };

  updateMember = async (userId, password) => {
    await Members.update(
      {
        userId,
        password,
      },
      {
        where: {
          userId,
          password,
        },
      }
    );
    return;
  };

  deleteMember = async (userId, hashPassword) => {
    await Members.destroy({ where: { userId, hashPassword } });
    return;
  };
}

module.exports = MembersRepository;
