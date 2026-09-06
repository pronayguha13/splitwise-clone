import { model } from "mongoose";
import TokenSchema from "../schemas/token.schema";

const TokenModel = model("Token", TokenSchema);

export default TokenModel;
