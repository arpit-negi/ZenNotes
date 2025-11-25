import {Redis} from "@upstash/Redis"
import {Ratelimit} from "@upstash/ratelimit"
import dotenv from "dotenv";

dotenv.config();
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10,"20 s"), //allow 10 req per 20sec
});
export default ratelimit;
