"use client";

import { Fragment, Suspense, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Loading from "./loading";
import {
  IconExternalLink,
  IconHome,
  IconSend,
  IconTrash,
  IconUpload,
} from "@tabler/icons";
import Link from "next/link";
import userInfo from "../../constants/userInformation";
import { apiLink } from "../../constants/apiRoute";

type companyInfo = {
  name: string;
  ids: any[];
};

async function getCompanyData(id: string) {
  const res = await fetch(
    `${apiLink}/api/collections/companyInformation/records/${id}`
  );
  const data = await res.json();
  return data as companyInfo;
}

async function deleteMockData(id: string) {
  const res = await fetch(
    `${apiLink}/api/collections/companyInformation/records/${id}`
  );
  const data = await res.json();
  const ids = data["ids"];
  for (let i = 0; i < userInfo.length; i++) {
    if (ids.includes(userInfo[i])) {
      ids.splice(ids.indexOf(userInfo[i]), 1);
    }
  }
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  };
  await fetch(
    `${apiLink}/api/collections/companyInformation/records/${id}`,
    options
  );
  // .then((response) => response.json())
  // .then((response) => console.log(response))
  // .catch((err) => console.error(err));
}

async function setMockData(id: string) {
  const res = await fetch(
    `${apiLink}/api/collections/companyInformation/records/${id}`
  );
  const data = await res.json();
  const ids = data["ids"];
  for (let i = 0; i < userInfo.length; i++) {
    if (!ids.includes(userInfo[i])) {
      ids.push(userInfo[i]);
    }
  }
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  };
  await fetch(
    `${apiLink}/api/collections/companyInformation/records/${id}`,
    options
  );
  // .then((response) => response.json())
  // .then((response) => console.log(response))
  // .catch((err) => console.error(err));
}

const keys = {
  m: "9r8qr69qsdsh2vs",
  n: "6b3vbgtll1tzh1a",
  s: "hwkwxepimftwegd",
};

const Companies = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [microsoftData, setMicrosoftData] = useState<any[]>();
  const [nintendoData, setNintendoData] = useState<any[]>([]);
  const [sonyData, setSonyData] = useState<any[]>([]);
  const [currentInfo, setCurrentInfo] = useState<any>([]);
  const [selected, setSelected] = useState<"m" | "n" | "s" | undefined>();

  useEffect(() => {
    async function getAllData() {
      const microsoftFetchData = getCompanyData(keys.m);
      const nintendoFetchData = getCompanyData(keys.n);
      const sonyFetchData = getCompanyData(keys.s);

      const companyArr = await Promise.all([
        microsoftFetchData,
        nintendoFetchData,
        sonyFetchData,
      ]);

      let userArr = [];
      for (let i = 0; i < companyArr.length; i++) {
        const promises = await Promise.all(
          companyArr[i]["ids"].map((id: string) =>
            fetch(`${apiLink}/api/collections/userInformation/records/${id}`)
          )
        );
        const userInfoArr = await Promise.all(
          promises.map((p: any) => p.json())
        );
        userArr.push(userInfoArr);
      }
      return userArr;
    }

    let m: any[];
    let n: any[];
    let s: any[];

    const id = setInterval(() => {
      getAllData()
        .then((res) => {
          m = res[0];
          n = res[1];
          s = res[2];
        })
        .then(() => {
          setMicrosoftData(m);
          setNintendoData(n);
          setSonyData(s);
        })
        .catch(() => console.log("Unable to fetch data"));
      console.log("refetched data");
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });

  const deleteData = async () => {
    if (selected == undefined) {
      return;
    }
    await deleteMockData(keys[selected]);
  };

  const uploadData = async () => {
    if (selected == undefined) {
      return;
    }
    await setMockData(keys[selected]);
  };

  const microsoft = microsoftData?.map((item, index) => {
    return (
      <li
        key={index}
        className="text-xl my-2 cursor-pointer hover:underline focus:underline"
        onClick={() => {
          setCurrentInfo(item);
          setModalOpened(true);
        }}
      >
        {item["firstName"]} {item["lastName"]}
      </li>
    );
  });

  const nintendo = nintendoData?.map((item, index) => {
    return (
      <li
        key={index}
        className="text-xl my-2 cursor-pointer hover:underline focus:underline"
        onClick={() => {
          setCurrentInfo(item);
          setModalOpened(true);
        }}
      >
        {item["firstName"]} {item["lastName"]}
      </li>
    );
  });

  const sony = sonyData?.map((item, index) => {
    return (
      <li
        key={index}
        className="text-xl my-2 cursor-pointer hover:underline focus:underline"
        onClick={() => {
          setCurrentInfo(item);
          setModalOpened(true);
        }}
      >
        {item["firstName"]} {item["lastName"]}
      </li>
    );
  });

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Link
          href={"/"}
          className="btn btn-circle btn-ghost fixed top-4 left-4"
        >
          <div className="tooltip tooltip-right" data-tip="Return Home">
            <IconHome stroke={2} size={28} />
          </div>
        </Link>

        <h1 className="my-8 text-5xl text-center font-bold font-libre">
          All Companies Data
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-8 mx-4">
          <div className="border border-gray-400 rounded-xl h-[36rem]">
            <h2 className="text-3xl text-center font-bold font-libre my-4">
              Microsoft
            </h2>
            <hr className="mx-4" />
            <div className="mx-4 mt-4">
              <h3 className="text-2xl font-semibold font-arimo">
                Candidates Interested:
              </h3>
              <ol className="list-decimal list-inside">{microsoft}</ol>
            </div>
          </div>
          <div className="border border-gray-400 rounded-xl">
            <h2 className="text-3xl text-center font-bold font-libre my-4">
              Nintendo
            </h2>
            <hr className="mx-4" />
            <div className="mx-4 mt-4">
              <h3 className="text-2xl font-semibold font-arimo">
                Candidates Interested:
              </h3>
              <ol className="list-decimal list-inside">{nintendo}</ol>
            </div>
          </div>
          <div className="border border-gray-400 rounded-xl">
            <h2 className="text-3xl text-center font-bold font-libre my-4">
              Sony
            </h2>
            <hr className="mx-4" />
            <div className="mx-4 mt-4">
              <h3 className="text-2xl font-semibold font-arimo">
                Candidates Interested:
              </h3>
              <ol className="list-decimal list-inside">{sony}</ol>
            </div>
          </div>
        </div>
        <div className="grid place-items-center">
          <div className="mt-4 inline-flex justify-center items-center">
            <select
              className="select select-bordered border border-gray-600 max-w-xs hover:bg-gray-600 dark:hover:text-black hover:text-white dark:hover:bg-gray-400 font-arimo"
              onChange={(e: any) => setSelected(e.target.value)}
            >
              <option disabled selected>
                Companies
              </option>
              <option value="m">Microsoft</option>
              <option value="n">Nintendo</option>
              <option value="s">Sony</option>
            </select>
            <button
              className="btn btn-outline mx-4 border border-gray-600 capitalize dark:hover:text-black hover:bg-gray-600 hover:text-white dark:hover:bg-gray-400 font-arimo"
              onClick={uploadData}
            >
              Upload Mock Data <IconUpload className="ml-2" size={16} />
            </button>
            <button
              className="btn btn-outline border border-gray-600 capitalize dark:hover:text-black hover:bg-gray-600 hover:text-white dark:hover:bg-gray-400 font-arimo"
              onClick={deleteData}
            >
              Delete Mock Data <IconTrash className="ml-2" size={16} />
            </button>
          </div>
        </div>

        <Transition appear show={modalOpened} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-20"
            onClose={() => setModalOpened(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black backdrop-filter backdrop-blur-md bg-opacity-20" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                      onClick={() => setModalOpened(false)}
                    >
                      ✕
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-2xl font-bold font-arimo text-gray-700 mt-2 mb-2">
                        {currentInfo.firstName} {currentInfo.lastName}
                      </h1>
                      <a
                        className="text-xl font-semibold font-arimo text-gray-700 my-2 hover:underline focus:underline"
                        href={`mailto:${currentInfo.email}`}
                      >
                        <p className="inline-flex flex-shrink-0 select-none flex-wrap items-center justify-center">
                          {currentInfo.email}{" "}
                          <IconSend size={20} className="ml-2" />
                        </p>
                      </a>
                      <a
                        href={`${apiLink}/api/files/${currentInfo["@collectionId"]}/${currentInfo.id}/${currentInfo.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline text-black hover:text-white mt-4 font-arimo hover:bg-gray-700 focus:text-white focus:bg-gray-700"
                      >
                        {currentInfo.firstName}'s Resume{" "}
                        <IconExternalLink size={20} className="pb-1" />
                      </a>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </Suspense>
    </>
  );
};

export default Companies;
