import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Post from './Post';
import ModalAddPost from './ModalAddPost';
import Tooltip from '../Common/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux';
import { getPostsRequest } from './../../redux/posts/postsActions';

const Posts: React.FC<{}> = () => {
  const [showModal, setShowModal] = React.useState(false);
  const posts = useSelector((state: AppState) => state.posts.posts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPostsRequest());
  }, []);

  return (
    <div className="c-posts">
      <div className="c-posts__header">
        <h3 className="c-title-secondary c-posts__title">
          Posts
          <FontAwesomeIcon
            className="c-icon c-posts__title-icon"
            icon={faCommentAlt}
          />
        </h3>
        <Tooltip label="Add post">
          <button
            type="button"
            className="c-btn c-posts__add-post-btn"
            onClick={() => setShowModal(!showModal)}
          >
            <FontAwesomeIcon className="c-icon" icon={faPlus} />
          </button>
        </Tooltip>
      </div>
      <div className="c-posts__items-container">
        {!posts.length && (
          <p className="c-posts__info">You don't have any posts yet!</p>
        )}
        {posts.map((p) => (
          <Post
            key={p._id}
            _id={p._id}
            name={p.name}
            avatar={p.avatar}
            createdAt={p.createdAt}
            text={p.text}
            likes={p.likes}
            comments={p.comments}
          />
        ))}
        {showModal && <ModalAddPost setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default Posts;
