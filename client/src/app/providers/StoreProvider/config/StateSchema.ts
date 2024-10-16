import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { UserSchema } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { ProjectSchema } from '@/entities/Project';
import { TaskSchema } from '@/entities/Task';
import { ProfileSchema } from '@/entities/Profile';
import { ForumSchema } from '@/entities/Forum';
import { StatisticsSchema } from '@/entities/Statistics';

export interface StateSchema {
    user: UserSchema;
    profile: ProfileSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // asynchronous reducers
    project?: ProjectSchema;
    task?: TaskSchema;
    forum?: ForumSchema;
    statistics?: StatisticsSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface reducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: reducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
