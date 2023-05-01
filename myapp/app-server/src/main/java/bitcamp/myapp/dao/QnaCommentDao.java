package bitcamp.myapp.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.QnaComment;

@Mapper
public interface QnaCommentDao {
  void insert(QnaComment qnacomment);
  List<QnaComment> findAll(int boardNo);
  List<QnaComment> findAll(String keyword);
  QnaComment findByNo(int qnaNo);
  QnaComment findByEmailAndPassword(Map<String,Object> params);
  QnaComment findByEmail(String email);
  int update(QnaComment b);
  int delete(int no);
}


