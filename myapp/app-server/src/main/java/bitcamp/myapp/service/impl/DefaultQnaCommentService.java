package bitcamp.myapp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.QnaCommentDao;
import bitcamp.myapp.service.QnaCommentService;
import bitcamp.myapp.vo.QnaComment;

@Service
public class DefaultQnaCommentService implements QnaCommentService {

  @Autowired private QnaCommentDao qnacommentDao;
  @Transactional
  @Override
  public void add(QnaComment qnacomment) {
    qnacommentDao.insert(qnacomment);
  }

  @Override
  public List<QnaComment> list(String qnaNo) {
    return qnacommentDao.findAll(qnaNo);
  }

  @Override
  public List<QnaComment> list(int qnaNo) {
    return qnacommentDao.findAll(qnaNo);
  }


  @Override
  public QnaComment get(int qnaNo) {
    return qnacommentDao.findByNo(qnaNo);
  }

  @Override
  public QnaComment get(String email, String password) {
    Map<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return qnacommentDao.findByEmailAndPassword(paramMap);
  }

  @Transactional
  @Override
  public void update(QnaComment qnacomment) {
    if (qnacommentDao.update(qnacomment) == 1 ) {
    } else {
      throw new RuntimeException("회원이 존재하지 않습니다.");
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (qnacommentDao.delete(no) == 1 ) {
    } else {
      throw new RuntimeException("회원이 존재하지 않습니다.");
    }
  }
}