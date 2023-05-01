package bitcamp.myapp.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.myapp.dao.TaxiPaymentDao;
import bitcamp.myapp.service.TaxiPaymentService;
import bitcamp.myapp.vo.Payment;
import bitcamp.myapp.vo.TaxiPayment;

@Service
public class DefaultTaxiPaymentService implements TaxiPaymentService {

  @Autowired
  private TaxiPaymentDao TaxipaymentDao;

  @Override
  public void add(TaxiPayment taxipayment) {
    TaxipaymentDao.insert(taxipayment);
  }

  @Override
  public List<Payment> list() {
    return TaxipaymentDao.findAll();
  }

  @Override
  public Payment get(String buyer_email) {
    return TaxipaymentDao.findByNo(buyer_email);
  }
}