const MembersService = require("../service/members");
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
class MembersController {
  membersService = new MembersService();

  SignupMember = async (req, res, next) => {
    try {
      const { userId, nickname, password, confirm } = req.body;

      await schema.validateAsync(req.body);
      await this.membersService.createMember(
        userId,
        nickname,
        password,
        confirm
      );
      res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (e) {
      return res.status(400).json({ code: 400, message: e.message });
    }
  };

  loginMember = async (req, res, next) => {
    try {
      const { userId, password } = req.body;
      if (req.headers.authorization) {
        res.status(401).send({ errorMessage: "이미 로그인이 되어있습니다." });
        return;
      }

      const LoginUserData = await this.membersService.findByMember(
        userId,
        password
      );
      res.status(200).json({ data: LoginUserData });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  };

  updateMember = async (req, res, next) => {
    try {
      const { userId, password } = req.body;
      await this.membersService.updateMember(userId, password);
      res.stauts(201).send("회원정보가 수정되었습니다");
    } catch (err) {
      res.status(400).send("입력하신 정보가 올바른지 확인해주세요");
    }
  };

  deleteMember = async (req, res, next) => {
    try {
      const { userId, password } = req.body;
      await this.membersService.deleteMember(userId, password);
      res.stauts(201).send("회원정보가 삭제되었습니다");
    } catch (err) {
      res.status(400).send("존재하지 않는 회원입니다.");
    }
  };
}

module.exports = MembersController;
