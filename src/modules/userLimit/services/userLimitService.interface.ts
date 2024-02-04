import { UserLimit } from "../entities/user-limit";

export interface IUserLimitService{
    create(data: UserLimit): Promise<any>;
    updateProgress(userLimitId: string, progress: string): Promise<any>;
}