const auth = require("../auth");

describe("auth middleware", () => {
  it("should authorize the user since", () => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    auth(headers, {}, () => {
      // expect(req.user).toMatchObject(user);
      console.log("req.user", req.user);
    });
  });

  it("should populate req.user with the payload of a valid JWT", () => {
    const user = { _id: "abc", isAdmin: true };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
