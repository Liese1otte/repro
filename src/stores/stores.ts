import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { row, col } from "../utils";

export const blankMap: <T>(v: T) => T[][] = <T>(v: T) => {
	return Array.from(Array(16), () => Array(16).fill(v));
};

// ### Persistent store setup

const enum Storage {
	Session,
	Local
}

const resolveStorage = (storageType: Storage) => {
	return storageType == Storage.Local ? localStorage : sessionStorage;
};

function persistent<T>(type: Storage, key: string, startValue: T): Writable<T> {
	const storedValue = browser && resolveStorage(type).getItem(key);
	const store: Writable<T> = writable(
		storedValue == null ? startValue : JSON.parse(storedValue as string)
	);
	store.subscribe((value: T) => {
		browser && resolveStorage(type).setItem(key, JSON.stringify(value));
	});
	return store;
}

// ### Camera settings

type CameraPosition = [x: number, y: number, z: number];
export const defaultCameraPosition: CameraPosition = [0, 20, 25];
export const cameraPosition = persistent(
	Storage.Session,
	'cameraPosition',
	defaultCameraPosition
);

type CameraTarget = [x: number, y: number, z: number];
export const defaultCameraTarget: CameraTarget = [0, 10, 0];
export const cameraTarget = persistent(
	Storage.Session,
	'cameraTarget',
	defaultCameraTarget
);

// ### Map stores

const prefabCount = 6;

type MapStore = Writable<number[][]> & {
	updateMap: (index: number, increment: number) => void;
	setMap: (index: number, value: number) => void;
};

export const heightMap: MapStore = {
	...persistent(Storage.Local, 'heightMap', blankMap(0)),
	updateMap: (index: number, increment: number) => {
		heightMap.update((v) => {
			v[row(index)][col(index)] += increment;
			return v;
		});
	},
	setMap: (index: number, value: number) => {
		heightMap.update((v) => {
			v[row(index)][col(index)] = value;
			return v;
		});
	}
};

export const prefabMap: MapStore = {
	...persistent(Storage.Local, 'prefabMap', blankMap(0)),
	updateMap: (index: number, increment: number) => {
		prefabMap.update((v) => {
			let nextPrefab = (v[row(index)][col(index)] + increment % prefabCount) % prefabCount;
			v[row(index)][col(index)] = nextPrefab < 0 ? prefabCount + nextPrefab : nextPrefab;
			return v;
		});
	},
	setMap: (index: number, value: number) => {
		prefabMap.update((v) => {
			value = value % prefabCount;
			v[row(index)][col(index)] = value < 0 ? prefabCount + value : value;
			return v;
		});
	}
};

type MapId = 0 | 1;

export const currentMapId = persistent<MapId>(Storage.Session, 'currentMapId', 0);

export function resolveMap(mapId: MapId): MapStore {
	return mapId == 0 ? heightMap : prefabMap;
}
