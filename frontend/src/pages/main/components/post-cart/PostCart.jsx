import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Icon } from "../../../../components"

function PostCartContainer({
  className,
  id,
  title,
  imageUrl,
  publishedAt,
  commentsCount,
}) {
  return (
    <div className={className}>
      <Link to={`/post/${id}`}>
        <img src={imageUrl} alt={title} />

        <div className="post-cart">
          <h4>{title}</h4>

          <div className="post-info">
            <div className="published-at">
              {publishedAt && (
                <Icon
                  inactive={true}
                  iconId="fa-calendar-o"
                  margin="0 10px 0 0"
                  size="18px"
                />
              )}
              {publishedAt}
            </div>

            <div className="comments-count">
              <Icon
                inactive={true}
                iconId="fa-comment-o"
                margin="0 10px 0 0"
                size="18px"
              />
              {commentsCount}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export const PostCart = styled(PostCartContainer)`
  display: flex;
  flex-direction: column;

  width: 280px;

  margin: 20px;

  border: 2px solid #000;

  & img {
    display: block;
    width: 100%;
  }

  & .post-cart {
    border-top: 2px solid #000;
    padding: 5px 10px;
  }

  & h4 {
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  & .post-info {
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
  }

  & .published-at {
    display: flex;
  }
  & .comments-count {
    display: flex;
  }
`
PostCart.PropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
}