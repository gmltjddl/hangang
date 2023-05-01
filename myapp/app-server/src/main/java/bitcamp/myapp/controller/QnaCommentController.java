package bitcamp.myapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.dao.QnaCommentDao;
import bitcamp.myapp.vo.QnaComment;
@RestController
@RequestMapping("/api/qnacomment")
public class QnaCommentController {

  @Autowired
  private QnaCommentDao qnaCommentDao;

  @GetMapping("/{qnaId}")
  public ResponseEntity<List<QnaComment>> getQnaComments(@PathVariable("qnaId") int qnaId) {
    return ResponseEntity.ok(qnaCommentDao.findAll(qnaId));
  }

  @PostMapping
  public ResponseEntity<QnaComment> createQnaComment(@RequestBody QnaComment qnaComment) {
    qnaCommentDao.insert(qnaComment);
    return ResponseEntity.ok(qnaComment);
  }

  @PutMapping("/{commentId}")
  public ResponseEntity<QnaComment> updateQnaComment(@PathVariable("commentId") int commentId, @RequestBody QnaComment qnaComment) {
    qnaComment.setNo(commentId);
    qnaCommentDao.update(qnaComment);
    return ResponseEntity.ok(qnaComment);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteQnaComment(@PathVariable("commentId") int commentId) {
    qnaCommentDao.delete(commentId);
    return ResponseEntity.ok().build();
  }
}

