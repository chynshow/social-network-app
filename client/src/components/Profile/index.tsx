import React from 'react';
import UserInfo, { UserInfoHeader } from './UserInfo';
import Posts from '../Posts';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfileRequest,
  getProfileByIdRequest,
} from './../../redux/profile/profileActions';
import { clearProfileAC } from '../../redux/profile/profileActionCreators';
import { AppState } from '../../redux';
import Loader from '../Common/Loader';
import UserAvatar from './UserAvatar';
import { useParams } from 'react-router-dom';

const Profile: React.FC<{}> = () => {
  const [showContent, setShowContent] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const { userId } = useParams();

  React.useEffect(() => {
    if (userId) {
      dispatch(getProfileByIdRequest(userId));
    } else if (!userId) {
      dispatch(getProfileRequest());
    }

    return () => {
      dispatch(clearProfileAC());
    };
  }, [userId]);

  const { profile } = useSelector((state: AppState) => state.profile);

  return (
    <section className="c-profile">
      {profile === null ? (
        <Loader />
      ) : (
        <>
          <div className="c-profile__user-info-container">
            <div className="l-profile">
              <UserAvatar />
            </div>
            <UserInfoHeader
              setShowContent={setShowContent}
              showContent={showContent}
            />
            <UserInfo showContent={showContent} />
          </div>
          <Posts />
        </>
      )}
    </section>
  );
};

export default Profile;
