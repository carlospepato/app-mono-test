import { describe, expect, it, vi } from "vitest";
import userService from "../../../services/userService";
import userController from "../../../controllers/userController";

describe("AuthController.deleteAccount", () => {

  it("should return 400 if user is not found", async () => {
    vi.spyOn(userService, "deleteUser").mockResolvedValue({ message: "User not found" });
    
    const mockRequest = {
      params: { id: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await userController.deleteUser(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 200 with a success message on successful deletion", async () => {
    vi.spyOn(userService, "deleteUser").mockResolvedValue({ message: "User deleted" });
    
    const mockRequest = {
      params: { id: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await userController.deleteUser(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "User deleted" });
  });
});