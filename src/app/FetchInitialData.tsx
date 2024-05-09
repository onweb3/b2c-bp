"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
	setGlobalHomeData,
	setInitialData,
	setInitialEnvData,
	setTourData,
} from "@/redux/features/initialsSlice";
import { useEffect, useLayoutEffect } from "react";

const FetchInitialData = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { config } = useAppSelector((state) => state.initials);

	useLayoutEffect(() => {
		async function getInitialEnv() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/initial/b2c`,
					{ next: { revalidate: 30 } }
				);

				dispatch(setInitialEnvData(await response.json()));
			} catch (err: any) {
				console.log(err, "initial-env-data");
			}
		}
		getInitialEnv();
	}, [dispatch]);

	useEffect(() => {
		async function getInitialData() {
			try {
				const response = await fetch(
					`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/home/initial-data`,
					{ next: { revalidate: 10 } }
				);

				dispatch(setInitialData(await response.json()));
			} catch (err: any) {
				console.log(err, "initial-data");
			}
		}
		getInitialData();
	}, [dispatch, config?.NEXT_PUBLIC_SERVER_URL]);

	const fetchDetails = async () => {
		try {
			const footerDetails = await fetch(
				`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/home`,
				{ next: { revalidate: 10 } }
			);
			if (!footerDetails.ok) {
				throw new Error(
					"Something went wrong. Please refresh the page."
				);
			}

			dispatch(setGlobalHomeData(await footerDetails.json()));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchDetails();
	}, [config?.NEXT_PUBLIC_SERVER_URL]);

	const getTours = async () => {
		try {
			const tours = await fetch(
				`${config?.NEXT_PUBLIC_TOURS_URL}/api/v1/tour-packages/all`,
				{ next: { revalidate: 30 } }
			);
			if (!tours.ok) {
				throw new Error("Failed to fetch data");
			}

			return tours.json();
		} catch (error) {
			console.log(error);
		}
	};

	async function findTours() {
		try {
			const response = await getTours();

			dispatch(setTourData(await response));
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		findTours();
	}, [config?.NEXT_PUBLIC_SERVER_URL]);

	return <></>;
};

export default FetchInitialData;
