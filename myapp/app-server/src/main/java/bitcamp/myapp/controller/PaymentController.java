package bitcamp.myapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.myapp.service.PaymentService;
import bitcamp.myapp.vo.Payment;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;

@RestController
@RequestMapping("/payments")
public class PaymentController {

  Logger log = LogManager.getLogger(getClass());

  @Autowired
  private PaymentService paymentService;

  @PostMapping("payment")
  public Object insert(@RequestBody Payment payment) {
    paymentService.add(payment);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("/{email}")
  public Object list(String keyword) {
    log.debug("PaymentController.list() 호출됨!");
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(paymentService.list(keyword));
  }

  //  @GetMapping("/seat")
  //  public Object seatlist() {
  //    log.debug("PaymentController.list() 호출됨!");
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS)
  //        .setData(paymentService.seatlist());
  //  }

  //  @GetMapping("{buyer_email}")
  //  public Object view(@PathVariable String buyer_email) {
  //    Payment payment = paymentService.get(buyer_email);
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