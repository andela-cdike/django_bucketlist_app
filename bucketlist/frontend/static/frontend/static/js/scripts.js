
jQuery(document).ready(function() {
    
    /* 
        Determine what form to show
    */
    if ( $('.show-register-form').hasClass('active') ) {
        $('.login-form').fadeOut('fast', function(){
            $('.register-form').fadeIn('fast');
        });
    }
    /*
        Forms show / hide
    */
    $('.show-login-form').on('click', function(){
        if( ! $(this).hasClass('active') ) {
            $('.show-register-form').removeClass('active');
            $(this).addClass('active');
            $('.register-form').fadeOut('fast', function(){
                $('.login-form').fadeIn('fast');
            });
        }
    });
    // ---    
    $('.show-register-form').on('click', function(){
        if( ! $(this).hasClass('active') ) {
            $('.show-login-form').removeClass('active');
            $(this).addClass('active');
            $('.login-form').fadeOut('fast', function(){
                $('.register-form').fadeIn('fast');
            });
        }
    });
        
    /*
        Login form validation
    */
    $('.l-form input[type="text"], .l-form input[type="password"], .l-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    
    $('.l-form').on('submit', function(e) {
        
        $(this).find('input[type="text"], input[type="password"], textarea').each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        
    });
    
    /*
        Registration form validation
    */
    $('.r-form input[type="text"], input[type="password"], .r-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    
    $('.r-form').on('submit', function(e) {
        
        $(this).find('input[type="text"], input[type="password"], textarea').each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });

        var pass = $('#r-form-password')
        var repass = $('#r-form-repassword')
        console.log(pass, repass)
        if (pass.val() !== repass.val()) {
            e.preventDefault();
            console.log("here")
            pass.addClass('input-error');
            repass.addClass('input-error');
        }
        else {
            $(this).removeClass('input-error');
        }
        
    });
    
    
});
