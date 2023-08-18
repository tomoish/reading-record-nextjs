import { isAuthenticatedUser } from "@/utils/isAuthenticated";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;

describe("isAuthenticated test", () => {
  it("should return true", async () => {
    axiosMock.post.mockResolvedValue({
      status: 200,
    });
    const response = await isAuthenticatedUser("");
    expect(response).toEqual(true);
  });

  it("should return false on error", async () => {
    axiosMock.post.mockRejectedValue(new Error("Mock error"));
    const response = await isAuthenticatedUser("");
    expect(response).toEqual(false);
  });
});
