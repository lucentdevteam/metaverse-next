const ErrorMsg = ({msg}) =>{
    return  (
        <div className="error-msg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="User Interface / Exclamation Mark">
            <path id="Vector" d="M8.00017 4.66683C7.82336 4.66683 7.65379 4.73707 7.52876 4.86209C7.40374 4.98712 7.3335 5.15669 7.3335 5.3335V8.00016C7.3335 8.17697 7.40374 8.34654 7.52876 8.47157C7.65379 8.59659 7.82336 8.66683 8.00017 8.66683C8.17698 8.66683 8.34655 8.59659 8.47157 8.47157C8.59659 8.34654 8.66683 8.17697 8.66683 8.00016V5.3335C8.66683 5.15669 8.59659 4.98712 8.47157 4.86209C8.34655 4.73707 8.17698 4.66683 8.00017 4.66683ZM8.6135 10.4135C8.59891 10.371 8.57873 10.3307 8.5535 10.2935L8.4735 10.1935C8.37975 10.101 8.2607 10.0383 8.13138 10.0134C8.00205 9.98849 7.86824 10.0024 7.74683 10.0535C7.66604 10.0873 7.59163 10.1346 7.52683 10.1935C7.46504 10.2558 7.41616 10.3297 7.38299 10.4109C7.34981 10.4921 7.33299 10.5791 7.3335 10.6668C7.33455 10.7539 7.35267 10.84 7.38683 10.9202C7.41677 11.0029 7.46454 11.078 7.52676 11.1402C7.58897 11.2025 7.6641 11.2502 7.74683 11.2802C7.82663 11.3154 7.91292 11.3337 8.00017 11.3337C8.08741 11.3337 8.1737 11.3154 8.2535 11.2802C8.33623 11.2502 8.41136 11.2025 8.47358 11.1402C8.53579 11.078 8.58356 11.0029 8.6135 10.9202C8.64766 10.84 8.66578 10.7539 8.66683 10.6668C8.67011 10.6224 8.67011 10.5779 8.66683 10.5335C8.65535 10.491 8.63736 10.4505 8.6135 10.4135ZM8.00017 1.3335C6.68162 1.3335 5.39269 1.72449 4.29636 2.45703C3.20004 3.18957 2.34555 4.23077 1.84097 5.44894C1.33638 6.66711 1.20436 8.00756 1.4616 9.30077C1.71883 10.594 2.35377 11.7819 3.28612 12.7142C4.21847 13.6466 5.40636 14.2815 6.69956 14.5387C7.99277 14.796 9.33322 14.6639 10.5514 14.1594C11.7696 13.6548 12.8108 12.8003 13.5433 11.704C14.2758 10.6076 14.6668 9.31871 14.6668 8.00016C14.6668 7.12468 14.4944 6.25778 14.1594 5.44894C13.8243 4.6401 13.3333 3.90517 12.7142 3.28612C12.0952 2.66706 11.3602 2.176 10.5514 1.84097C9.74255 1.50593 8.87565 1.3335 8.00017 1.3335ZM8.00017 13.3335C6.94533 13.3335 5.91419 13.0207 5.03712 12.4347C4.16006 11.8486 3.47648 11.0157 3.07281 10.0411C2.66914 9.0666 2.56352 7.99425 2.76931 6.95968C2.9751 5.92512 3.48305 4.97481 4.22893 4.22893C4.97481 3.48305 5.92512 2.9751 6.95968 2.76931C7.99425 2.56352 9.06661 2.66914 10.0411 3.07281C11.0157 3.47647 11.8486 4.16006 12.4347 5.03712C13.0207 5.91418 13.3335 6.94533 13.3335 8.00016C13.3335 9.41465 12.7716 10.7712 11.7714 11.7714C10.7712 12.7716 9.41465 13.3335 8.00017 13.3335Z" fill="#C40941"/>
            </g>
            </svg>
            <p>{msg}</p>
        </div>
    )
}
export default ErrorMsg;