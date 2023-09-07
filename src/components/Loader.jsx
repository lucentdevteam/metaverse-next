import FormTitle from "./form/FormTitle"

export default function Loader({ title,text }) {
    return (
        <div className="loader-animate">
            <FormTitle title={title} />
            <svg xmlns="http://www.w3.org/2000/svg" width="107" height="96" viewBox="0 0 107 96" fill="none">
                <rect x="4.57129" y="55.619" width="21.3333" height="19.0476" rx="9.52381" fill="url(#paint0_linear_1099_52931)" />
                <rect x="79.7607" y="20.5714" width="21.3333" height="20.6794" rx="10.3397" transform="rotate(29.7743 79.7607 20.5714)" fill="#99E3F8" />
                <rect x="44.7598" y="74.6174" width="21.6555" height="21.8304" rx="10.8278" transform="rotate(-35.856 44.7598 74.6174)" fill="url(#paint1_linear_1099_52931)" />
                <defs>
                    <linearGradient id="paint0_linear_1099_52931" x1="21.7141" y1="55.205" x2="19.3263" y2="75.7484" gradientUnits="userSpaceOnUse">
                        <stop offset="0.28605" stop-color="#4C49BD" />
                        <stop offset="0.560793" stop-color="#99E3F8" />
                        <stop offset="1" stop-color="#99E3F8" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_1099_52931" x1="61.1776" y1="74.1941" x2="58.2347" y2="97.4343" gradientUnits="userSpaceOnUse">
                        <stop offset="0.140625" stop-color="#8BCBE7" />
                        <stop offset="0.512174" stop-color="#B35DDD" />
                        <stop offset="1" stop-color="#E43CB3" />
                    </linearGradient>
                </defs>
            </svg>
            <p>{text}</p>
        </div>
    )
}