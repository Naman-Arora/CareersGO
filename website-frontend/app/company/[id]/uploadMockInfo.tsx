"use client";
import { useRouter } from "next/navigation";
import userInfo from "../../../constants/userInformation";
import { apiLink } from "../../../constants/apiRoute";


type Props = {
  id: string;
};

const UploadInformation = (props: Props) => {
  const router = useRouter();

  async function setMockData() {
    const res = await fetch(
      `${apiLink}/api/collections/companyInformation/records/${props.id}`
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
    fetch(
      `${apiLink}/api/collections/companyInformation/records/${props.id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    router.refresh();
  }

  return (
    <button
      className="font-arimo font-bold text-lg btn btn-info btn-wide btn-outline m-4"
      onClick={setMockData}
    >
      Upload Filler Info
    </button>
  );
};
export default UploadInformation;
