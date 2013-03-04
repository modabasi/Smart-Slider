
jQuery(document).ready(function(){

        document.adminForm.onsubmit = function(){
            jQuery('#sp-slider-element').remove();

        }

        jQuery("#options-sliders select, #options-animation select").removeClass("chzn-done").css('display', 'inline').data('chosen', null);
        jQuery("#options-sliders, #options-animation").find("*[class*=chzn]").remove();

        ;(function() {
                //SqueezeBox.initialize();
                SqueezeBox.assign('.model', { parse: 'rel' });
        }).delay(1000);


        jQuery('#options-sliders, #options-animation').find('div.controls').css('margin-left',5);
        $addon = jQuery('#jform_params_sp_style option:selected').text();
        jQuery('#module-form ul.nav li:eq(3) a').text($addon+' settings');
        jQuery('#options-sliders').addClass('sp-slider-option-container');
        jQuery('body').delegate("#jform_params_sp_style",'change', function(){

                $addon = jQuery(this).find('option:selected').text();

                jQuery('#module-form ul.nav li:eq(3) a').text($addon+' settings');

                $ver = eval('anim'+jQuery(this).val());

                //  push html and add chosen
                jQuery('#sp-animation-setting-panel').html(jQuery($ver).html());

                //  adding joomla tooltip
                $$('.hasTip').each(function(el) {
                        var title = el.get('title');

                        if (title) {
                            var parts = title.split('::', 2);
                            el.store('tip:title', parts[0]);
                            el.store('tip:text', parts[1]);
                        }
                });
                var JTooltips = new Tips($$('.hasTip'), { maxTitleChars: 50, fixed: false});

                ///

        });   // end change event delegate

        $('sp-slide-add').addEvent('click', function(){

                $html='';
                $html = $('sp-slider-element').get('html');
                var formObjects=$('sp-slider-element').toQueryString().parseQueryString();
                $title = $('sp-slider-element').getElement('[ref="title"]').get('value');
                $state = $('sp-slider-element').getElement('select.sp-state').get('value');
                $sourcename = $('sp-slider-element').getElement('select.sp-sliders-source-type option:selected').get('text');
                if( $title.trim()=='' )
                    {
                    return;
                }

                $phtml = $html.replace(/\b(item|image)-([0-9]+)\b/g,'$1-added-'+sp_item_increment);
                sp_item_increment+=1;
                $ghtml = '<li><div class="sp-flt-left"><span class="sp-move"></span></div><span class="sp-title sp-toggler">'+ $title+'&nbsp;&nbsp;::&nbsp;&nbsp;<span class="sp-title-source">'+$sourcename+'</span></span><div class="sp-flt-right"><span class="sp-edit"></span>    <span ref="state" class="sp-'+$state+'"></span>   <span class="sp-delete"></span> </div><div style="clear:both"></div> <div class="sp-toggle-element" >';
                $ghtml += '<ul class="sp-element">'+$phtml+'</ul></div></li>';

                var $item = new Element('span',
                    {
                        'html': $ghtml
                });

                $item.getElements('input, select, textarea').each(function(ele, i){
                        ele.set('value',  formObjects[ele.get('name')].trim() );
                });

                $item.getChildren().inject( $('sliders-slide-list') );
                $value = $('sliders-slide-list').getLast().getElements('select')[0].get('value');
                $selectInfo = $('sliders-slide-list').getLast().getElements('select')[0];
                $lastli = $('sliders-slide-list').getLast().getElement('li.sp-sliders-source-type-li').setStyles({

                        'display':'none'
                }); 


                var $source = new Element('input', {
                        'type': 'hidden',
                        'value':$value,
                        'name':$selectInfo.get('name'),
                        'readonly':'readonly'
                });

                $source.replaces($selectInfo);

                ;(function() {
                        //SqueezeBox.initialize();
                        SqueezeBox.assign('.model', { parse: 'rel' });
                }).delay(1000);

                spSortable('sliders-slide-list');
                spAccordion('.sp-toggler-main','.sp-toggle-element-main');
                spAccordion('.sp-toggler','.sp-toggle-element' );
                spAccordion('.sp-edit','.sp-toggle-element' );
                $$('.hasTip').each(function(el) {
                        var title = el.get('data-title');
                        if (title) {
                            var parts = title.split('::', 2);
                            el.store('tip:title', parts[0]);
                            el.store('tip:text', parts[1]);
                        }
                });
                var JTooltips = new Tips($$('.hasTip'), { maxTitleChars: 50, fixed: false});
                $$('.hasTip').each(function(el) {
                        var title = el.get('title');

                        if (title) {
                            var parts = title.split('::', 2);
                            el.store('tip:title', parts[0]);
                            el.store('tip:text', parts[1]);
                        }
                });

                new Tips($$('.hasTip'), { maxTitleChars: 50, fixed: false});
        });

        jQuery('body').delegate('select.sp-sliders-source-type', 'change', function(){

                eval( "var $ver=(" + jQuery(this).val()+'HTML' + ")" );
                jQuery(this).parent().nextAll().remove();
                $ver.replace(/\b(item|image)-([0-9]+)\b/g,'$1-saved-'+(sp_item_increment+1));
                jQuery(this).parent().after($ver);

                ;(function() {
                        //SqueezeBox.initialize();
                        SqueezeBox.assign('a.model', { parse: 'rel' });
                }).delay(500);

                $$('.hasTip').each(function(el) {
                        var title = el.get('title');

                        if (title) {
                            var parts = title.split('::', 2);
                            el.store('tip:title', parts[0]);
                            el.store('tip:text', parts[1]);
                        }
                });

                new Tips($$('.hasTip'), { maxTitleChars: 50, fixed: false});
        });

        $(document.body).addEvent("click:relay(.sp-delete)", function(event, element) {

                conf = confirm('Are you sure to delete "'+element.getParent('li').getElements('.sp-title')[0].get('text').trim()+'"?');
                if( conf )
                    {
                    element.getParent('li').destroy();
                } else {
                }
        });

        $(document.body).addEvent("change:relay(.sp-toggle-element select.sp-state)", function(event, element){
                var e = this.getParent().getParent().getParent().getParent();
                e.getElements('span[ref="state"]')[0].set('class','sp-'+ this.get('value') ); 
        });

        $(document.body).addEvent("click:relay(span[ref='state'])", function(event, element)
            {
                var e = this.getParent()
                .getParent()
                .getElements('.sp-toggle-element select.sp-state')[0];

                if( e.get('value')=='published' )
                    {
                    e.set('value', 'unpublished');
                    this.set('class', 'sp-unpublished');
                } else {
                    e.set('value', 'published');
                    this.set('class', 'sp-published');
                }
        });


        $(document.body).addEvent("blur:relay(.sp-toggle-element input[ref='title'])", function(event, element){
                this.getParent().getParent().getParent().getParent().getChildren('span.sp-title')[0].set('html',this.get('value').trim());
        });

        function spSortable(id)
        {
            new Sortables($(id), {
                    clone:true,
                    revert: true,
                    constrain: true,
                    opacity: 0.7,
                    handle : 'span.sp-move',
                    initialize: function() {},
                    onComplete: function(el){}
            });
        }


        function spAccordion(handler, element, displays) {
            if( typeof(displays)==='undefined' ){
                displays = -1;
            }

            new Fx.Accordion($$(handler), $$(element),{
                    alwaysHide: true,
                    display: displays,
                    onActive: function(toggler) { toggler.getParent().addClass('sp-toggler-open'); },
                    onBackground: function(toggler) { toggler.getParent().removeClass('sp-toggler-open'); }
            })
        }

        spSortable('sliders-slide-list');
        spAccordion('.sp-toggler-main','.sp-toggle-element-main');
        spAccordion('.sp-toggler','.sp-toggle-element' );
        spAccordion('.sp-edit','.sp-toggle-element' );

});