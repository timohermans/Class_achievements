/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Achievements = "achievements",
	ClassAchievements = "class_achievements",
	Classes = "classes",
	People = "people",
	Phases = "phases",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AchievementsRecord = {
	name: string
	description: HTMLString
	iconUrl: string
}

export type ClassAchievementsRecord = {
	class: RecordIdString
	achievement: RecordIdString
	isAchieved?: boolean
	achievedAt?: IsoDateString
	peopleInvolved?: RecordIdString[]
}

export type ClassesRecord = {
	name: string
	phase?: RecordIdString
	people?: RecordIdString[]
}

export type PeopleRecord = {
	name: string
}

export type PhasesRecord = {
	name: string
	startAt: IsoDateString
	endAt: IsoDateString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AchievementsResponse = AchievementsRecord & BaseSystemFields
export type ClassAchievementsResponse<Texpand = unknown> = ClassAchievementsRecord & BaseSystemFields<Texpand>
export type ClassesResponse<Texpand = unknown> = ClassesRecord & BaseSystemFields<Texpand>
export type PeopleResponse = PeopleRecord & BaseSystemFields
export type PhasesResponse = PhasesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	achievements: AchievementsRecord
	class_achievements: ClassAchievementsRecord
	classes: ClassesRecord
	people: PeopleRecord
	phases: PhasesRecord
	users: UsersRecord
}