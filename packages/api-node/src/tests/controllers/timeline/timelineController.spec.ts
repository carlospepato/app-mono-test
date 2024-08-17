import { describe, expect, it, vi } from "vitest"
import timelineService from "../../../services/timelineService"
import timelineController from "../../../controllers/timelineController"

describe("Timeline Controller", () => {
  it("should return 401 if user is not authenticated", async () => {
    vi.spyOn(timelineService, "timeline").mockRejectedValue(new Error("Unauthorized"))

    const mockRequest = {
      user: { sub: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await timelineController.timeline(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "Unauthorized" })
  })
});