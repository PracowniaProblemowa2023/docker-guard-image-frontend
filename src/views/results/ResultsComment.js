import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ENDPOINTS, ERROR } from '../../miscellanous/Constants';
import Comment from '../../miscellanous/components/Comment';
import { ThrowError } from '../../errors/ErrorThrower';
import PropTypes from 'prop-types';

export default function ResultsComment({ scanResultId }) {
  const params = useParams();
  const { keycloak } = useKeycloak();
  const [comments, setComments] = useState(null);
  const [commentInputValue, setCommentInputValue] = useState('');
  const [errorCode, setErrorCode] = useState(null);

  async function getComments() {
    await axios({
      method: 'get',
      url: ENDPOINTS.COMMENT + '/' + params.id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`
      }
    })
      .then(({ data }) => {
        setComments(data);
      })
      .catch((error) => {
        if (error.response) {
          setErrorCode(error.response.status);
        } else {
          setErrorCode(ERROR.UNKNOWN);
        }
      });
  }

  if (errorCode) {
    ThrowError(errorCode);
  }

  function handleCommentInputChange(e) {
    const { value } = e.target;
    setCommentInputValue(value);
  }

  function commentScanResult() {
    if (commentInputValue !== '') {
      axios({
        method: 'post',
        url: ENDPOINTS.COMMENT,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${keycloak.token}`
        },
        data: {
          imageScanId: scanResultId,
          text: commentInputValue
        }
      })
        .then((value) => {
          setComments([value.data, ...comments]);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setCommentInputValue(''));
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <p className="mt-5 text-xl">Comments</p>
      <div className="grid grid-cols-12 gap-4">
        <input
          className="col-span-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imageWithTag"
          type="text"
          placeholder="Add comment"
          value={commentInputValue}
          onChange={handleCommentInputChange}
        />
        <button
          className="col-span-2 w-full bg-red-normal text-white rounded-sm h-12 hover:bg-red-light"
          onClick={commentScanResult}>
          Add
        </button>
      </div>
      {comments !== null &&
        comments !== undefined &&
        comments.map((element) => <Comment element={element} key={element.id} />)}
    </>
  );
}

ResultsComment.propTypes = { scanResultId: PropTypes.string };
