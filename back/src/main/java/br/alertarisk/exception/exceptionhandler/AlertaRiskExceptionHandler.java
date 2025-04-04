package br.alertarisk.exception.exceptionhandler;

import br.alertarisk.exception.ErrorMessageDTO;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ControllerAdvice
public class AlertaRiskExceptionHandler extends RuntimeException {

    private final MessageSource messageSource;

    public AlertaRiskExceptionHandler(MessageSource message){
        this.messageSource = message;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorMessageDTO>> handleMethodArgumentNotValid(MethodArgumentNotValidException e){
        List<ErrorMessageDTO> dto = new ArrayList<>();

        e.getBindingResult().getFieldErrors().forEach(err -> {
            String message = messageSource.getMessage(err, LocaleContextHolder.getLocale());
            ErrorMessageDTO error = new ErrorMessageDTO(message, err.getField());
            dto.add(error);
        });
        return new ResponseEntity<>(dto, BAD_REQUEST);
    }
}
