import ProfileImage from "./ProfileImage";

type ProfileCardProps = {
  username: string;
  email: string;
  profileImage?: string;
};
const ProfileCard = ({ username, email, profileImage }: ProfileCardProps) => (
  <div className="flex flex-col justify-center items-center gap-2 ">
    <ProfileImage profileImage={profileImage} />
    <div className="text-center">
      <h2 className="text-gray-800 dark:text-white text-3xl font-bold">
        {`@${username}`}
      </h2>
      <p className="mt-2 text-gray-500 text-base">{email}</p>
    </div>
  </div>
);

export default ProfileCard;
