import { describe, expect, it, vi } from "vitest";
import profileService from "../../../services/profileService";
import profileController from "../../../controllers/profileController";

describe("Profile Controller", () => {
  it("should return 401 if user is not authenticated", async () => {
    vi.spyOn(profileService, "profile").mockRejectedValue(new Error("Unauthorized"));
    
    const mockRequest = {
      user: { sub: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await profileController.profile(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return 400 if user is not found", async () => {
    vi.spyOn(profileService, "profile").mockResolvedValue(null);
    
    const mockRequest = {
      user: { sub: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await profileController.profile(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "User not found" });
    
  });

  it("should return 200 if user is found", async () => {
    vi.spyOn(profileService, "profile").mockResolvedValue({ user: { name: "John Doe", email: "john.doe@example.com", password: "" } });

    const mockRequest = {
      user: { sub: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await profileController.profile(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "Profile found", user: { name: "John Doe", email: "john.doe@example.com", password: "" } });
  });
});