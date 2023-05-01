package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.TaxiPaymentService;
import bitcamp.myapp.vo.TaxiPayment;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/taxipayments")
public class TaxiPaymentController {

  Logger log = LogManager.getLogger(getClass());

  @Autowired
  private TaxiPaymentService taxipaymentService;

  @PostMapping("taxipayment")
  public Object insert(@RequestBody TaxiPayment taxipayment) {
    taxipaymentService.add(taxipayment);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("{email}")
  public Object list(@PathVariable("email") String keyword) {
    log.debug("TaxiPaymentController.list() 호출됨!");

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(taxipaymentService.list(keyword));
  }

  //  @GetMapping("{buyer_email}")
  //  public Object view(@PathVariable String buyer_email) {
  //    Payment payment = taxipaymentService.get(buyer_email);
  //    if (payment != null) {
  //      return new RestResult()
  //          .setStatus(RestStatus.SUCCESS)
  //          .setData(payment);
  //    } else {
  //      return new RestResult()
  //          .setStatus(RestStatus.FAILURE)
  //          .setErrorCode(ErrorCode.rest.NO_DATA);
  //    }
  //  }
}