package bitcamp.myapp.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.myapp.dao.PaymentDao;
import bitcamp.myapp.service.PaymentService;
import bitcamp.myapp.vo.Payment;

@Service
public class DefaultPaymentService implements PaymentService {

  @Autowired
  private PaymentDao paymentDao;

  @Override
  public void add(Payment payment) {
    paymentDao.insert(payment);
  }

  @Override
  public List<Payment> list(String email) {
    return paymentDao.findAll(email);
  }

  @Override
  public List<Payment> seatlist() {
    return paymentDao.seatlist();
  }

  @Override
  public Payment get(String buyer_email) {
    return paymentDao.findByNo(buyer_email);
  }
}