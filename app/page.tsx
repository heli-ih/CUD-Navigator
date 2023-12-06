import Image from "next/image";
import "@styles/globals.css";
interface Faculty {
  id: Number;
  name: String;
  position: String;
  loc: String;
}

export default function Home() {
  return (
    <main className="">
      {/* Navbar */}
      <div className="flex items-center w-full bg-gray-800 h-24 px-20">
        <div>
          <Image src="/CUDlogo.png" alt="CUDlogo" width={200} height={60} />
        </div>
      </div>
      {/* Search List */}
      <section className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-[50%] min-w-[30%]">
        {/* search bar */}
        <div className="flex justify-between mb-5 w-full ">
          <input
            className="p-1 text-xs rounded-md border border-gray-800 pr-20 "
            type="search"
            name=""
            id=""
            placeholder="Enter a name..."
          />
          <button className="p-1 text-xs rounded-md border border-gray-800 bg-red-400 text-white px-2">
            Search
          </button>
        </div>
        {/* result list */}
        <ul className=" bg-slate-50 rounded-md  border border-gray-800">
          {(() => {
            const faculty1: Faculty = {
              id: 1,
              name: "Dr Said",
              position: "Associate Professor",
              loc: "Hub G,09",
            };
            return (
              <a href={`/locations/${faculty1.id}`}>
                <li className="flex flex-row items-center m-4 px-5 py-3 roun rounded-md bg-slate-200">
                  <Image
                    className="rounded-md"
                    src="/Dr.Said.png"
                    alt="Dr. Said"
                    width={60}
                    height={60}
                  />
                  <span className=" mx-5">
                    <div className="flex flex-col">
                      <span>
                        <strong>Name:</strong> {faculty1.name}
                      </span>
                      <span>
                        <strong>Position:</strong> {faculty1.position}
                      </span>
                      <span>
                        <strong>Location:</strong> {faculty1.loc}
                      </span>
                    </div>
                  </span>
                </li>
              </a>
            );
          })()}
          {(() => {
            const faculty1: Faculty = {
              id: 2,
              name: "Dr. Ziad",
              position: "Associate Professor",
              loc: "Hub G,09",
            };
            return (
              <a href={`/locations/${faculty1.id}`}>
                <li className="flex flex-row items-center m-4 px-5 py-3 roun rounded-md bg-slate-200">
                  <Image
                    className="rounded-md"
                    src="/Dr.Ziad.png"
                    alt="Dr.Ziad"
                    width={60}
                    height={60}
                  />
                  <span className=" mx-5">
                    <div className="flex flex-col">
                      <span>
                        <strong>Name:</strong> {faculty1.name}
                      </span>
                      <span>
                        <strong>Position:</strong> {faculty1.position}
                      </span>
                      <span>
                        <strong>Location:</strong> {faculty1.loc}
                      </span>
                    </div>
                  </span>
                </li>
              </a>
            );
          })()}
          {(() => {
            const faculty1: Faculty = {
              id: 3,
              name: "Dr. Sherif",
              position: "Associate Professor",
              loc: "Hub G,09",
            };
            return (
              <a href={`/locations/${faculty1.id}`}>
                <li className="flex flex-row items-center m-4 px-5 py-3 roun rounded-md bg-slate-200">
                  <Image
                    className="rounded-md"
                    src="/Dr.Sherif.png"
                    alt="Dr.Sherif"
                    width={60}
                    height={60}
                  />
                  <span className=" mx-5">
                    <div className="flex flex-col">
                      <span>
                        <strong>Name:</strong> {faculty1.name}
                      </span>
                      <span>
                        <strong>Position:</strong> {faculty1.position}
                      </span>
                      <span>
                        <strong>Location:</strong> {faculty1.loc}
                      </span>
                    </div>
                  </span>
                </li>
              </a>
            );
          })()}
        </ul>
      </section>
    </main>
  );
}
