import { enqueueSnackbar, closeSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
// components
import RHFTextField from '../../../../components/common/RHFTextField';
// redux
import { savePost, editPost, onMoveList } from '../../../../redux/slices/board';
import { dispatch, useSelector, RootState } from '../../../../redux/store';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
// bootstrap
import { Button } from 'react-bootstrap';

// ----------------------------------------------------------------------

const dlStyle = {
  padding: 10,
} as React.CSSProperties

interface PostNewEditForm {
  isEdit?: boolean;
}

interface IPost {
  userId: string;
  id: number | null;
  title: string;
  body: string;
}

interface IComment {
  postId: IPost["id"];
  id: number;
  name: string;
  email: string;
  body: string;
}

interface IView {
  post: IPost;
  comments: Array<IComment>;
}

export default function PostNewEditForm({isEdit}: PostNewEditForm) {
  const { view } = useSelector((state: RootState) => state.board);
  const { post, comments } = view as IView;

  const PostSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    body: Yup.string().required('내용을 입력하세요.'),
  });

  const defaultValues = useMemo(
    () => ({
      userId: post?.userId || '1',  // TODO: 사용자 정보를 조회하여 값 설정
      id: post?.id || null,
      title: post?.title || '',
      body: post?.body || '',
    }),
    [post],
  );

  const methods = useForm({
    resolver: yupResolver(PostSchema),
    defaultValues,
  });
  
  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && post) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, post, defaultValues, reset]);

  const onSubmit = async () => {
    const msg = isEdit ? '수정' : '저장';
    try {
      const newPost = {
        ...values,
        userId: (isEdit && post.userId) || '1', // TODO: 사용자 정보를 조회하여 값 설정
        id: (isEdit && post.id) || 0,
      };
      if (!isEdit) {
        dispatch(savePost(newPost)).then(() => enqueueSnackbar('게시글이 저장되었습니다.', { variant: 'success', autoHideDuration: 3000 }));
      } else {
        dispatch(editPost(newPost)).then((response) => {
          if(response?.userId) {  // response?.success 성공 상태값
            enqueueSnackbar('게시글이 수정되었습니다.', { variant: 'success', autoHideDuration: 3000 });
            dispatch(onMoveList());
          } else {
            enqueueSnackbar('게시글 수정에 실패하였습니다.', { variant: 'error' });
          }
        });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`게시글 ${msg}에 실패하였습니다.`, { variant: 'error', autoHideDuration: 3000 });
    }
  };

  return  (
    <div className="cont-item">
      <div style={{ color: 'gray', marginBottom: 15 }}>
        <h2 className="h2-title">react-hook-form example</h2>
      </div>
      <h3 className="h3-title">Post</h3>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <dl style={dlStyle}>
              <dd>
                <RHFTextField name="title" label="제목" placeholder="제목을 입력하세요..." />
                <div style={{ height: 10 }}></div>
                <RHFTextField name="body" label="내용" placeholder="내용을 입력하세요..." />
              </dd>
            </dl>
          </div>
          <div style={{display: 'inline-block', margin: '0 5px',  float: 'right'}}>
            <Button type="button" onClick={() => dispatch(onMoveList())} style={{ backgroundColor: 'gray', border: 0 }}>
              {!isEdit ? '목록' : '취소'}
            </Button>&nbsp;
            <Button type="submit" disabled={isSubmitting} >
              {!isEdit ? '등록' : '수정'}
            </Button>
          </div>
        </form>
      </FormProvider>
      
      <div style={{ marginTop: 30}}></div>

      <h3 className="h3-title">Comments</h3>
      <div className="form-item">
        {
          comments.map((row, i) => 
          row ? (
            <dl style={dlStyle} key={i}>
              <dt>{row.name} / {row.email}</dt>
              <dt>{row.body}</dt>
            </dl>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}