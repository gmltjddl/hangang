package bitcamp.myapp.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.myapp.dao.CommentDao;
import bitcamp.myapp.service.CommentService;
import bitcamp.myapp.vo.Comment;

@Service
public class DefaultCommentService implements CommentService {

  @Autowired private CommentDao commentDao;
  @Transactional
  @Override
  public void add(Comment comment) {
    commentDao.insert(comment);
  }

  @Override
  public List<Comment> list(String keyword) {
    return commentDao.findAll(keyword);
  }

  @Override
  public Comment get(int no) {
    return commentDao.findByNo(no);
  }

  @Override
  public Comment get(String email, String password) {
    Map<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return commentDao.findByEmailAndPassword(paramMap);
  }

  @Transactional
  @Override
  public void update(Comment comment) {
    if (commentDao.update(comment) == 1 ) {
    } else {
      throw new RuntimeException("회원이 존재하지 않습니다.");
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (commentDao.delete(no) == 1 ) {
    } else {
      throw new RuntimeException("회원이 존재하지 않습니다.");
    }
  }
}





